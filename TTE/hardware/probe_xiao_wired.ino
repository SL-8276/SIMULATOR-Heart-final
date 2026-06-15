/*
  Interactive TTE Simulator wired probe firmware
  Board: Seeed Studio XIAO ESP32-S3

  Sensors:
    - BNO055 over I2C
    - PN532 over SPI
    - Button input

  Serial output format required by the Electron parser:
    Q qw,qx,qy,qz Z TAGx BTN b SEQ n
*/

#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BNO055.h>
#include <Adafruit_PN532.h>
#include <utility/imumaths.h>

#define BNO_SDA D4
#define BNO_SCL D5

#define PN532_SCK D8
#define PN532_MOSI D10
#define PN532_MISO D9
#define PN532_SS D2

#define BUTTON_PIN D1

#define SERIAL_BAUD 460800
#define OUTPUT_INTERVAL_MS 10
#define NFC_READ_TIMEOUT_MS 5

Adafruit_BNO055 bno = Adafruit_BNO055(55, 0x28, &Wire);
Adafruit_PN532 nfc(PN532_SS, &SPI);

const uint8_t TAG_COUNT = 5;
const uint8_t TAG_UID_LENGTH = 7;

const uint8_t TAGS[TAG_COUNT][TAG_UID_LENGTH] = {
  {0x53, 0x15, 0x96, 0x4B, 0x74, 0x00, 0x01}, // TAG1
  {0x53, 0x38, 0x91, 0x4B, 0x74, 0x00, 0x01}, // TAG2
  {0x53, 0x74, 0x8D, 0x4B, 0x74, 0x00, 0x01}, // TAG3
  {0x53, 0x41, 0x84, 0x4B, 0x74, 0x00, 0x01}, // TAG4
  {0x53, 0xF3, 0x7E, 0x4B, 0x74, 0x00, 0x01}  // TAG5
};

uint32_t sequenceNumber = 0;
uint32_t lastOutputMs = 0;
char currentTag[6] = "TAG0";

bool sameUid(const uint8_t *a, const uint8_t *b, uint8_t length) {
  for (uint8_t i = 0; i < length; i++) {
    if (a[i] != b[i]) {
      return false;
    }
  }
  return true;
}

void updateTag() {
  uint8_t uid[7] = {0};
  uint8_t uidLength = 0;

  bool found = nfc.readPassiveTargetID(
    PN532_MIFARE_ISO14443A,
    uid,
    &uidLength,
    NFC_READ_TIMEOUT_MS
  );

  if (!found) {
    strcpy(currentTag, "TAG0");
    return;
  }

  strcpy(currentTag, "TAG0");
  if (uidLength != TAG_UID_LENGTH) {
    return;
  }

  for (uint8_t i = 0; i < TAG_COUNT; i++) {
    if (sameUid(uid, TAGS[i], TAG_UID_LENGTH)) {
      snprintf(currentTag, sizeof(currentTag), "TAG%u", i + 1);
      return;
    }
  }
}

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  Serial.begin(SERIAL_BAUD);
  delay(300);

  Wire.begin(BNO_SDA, BNO_SCL);
  SPI.begin(PN532_SCK, PN532_MISO, PN532_MOSI, PN532_SS);

  if (!bno.begin()) {
    while (true) {
      Serial.println("Q 1.000000,0.000000,0.000000,0.000000 Z TAG0 BTN 0 SEQ 0");
      delay(1000);
    }
  }

  bno.setExtCrystalUse(true);

  nfc.begin();
  uint32_t versionData = nfc.getFirmwareVersion();
  if (versionData) {
    nfc.SAMConfig();
  }
}

void loop() {
  uint32_t now = millis();
  if (now - lastOutputMs < OUTPUT_INTERVAL_MS) {
    return;
  }
  lastOutputMs = now;

  updateTag();

  imu::Quaternion quat = bno.getQuat();
  int buttonPressed = digitalRead(BUTTON_PIN) == LOW ? 1 : 0;

  Serial.print("Q ");
  Serial.print(quat.w(), 6);
  Serial.print(",");
  Serial.print(quat.x(), 6);
  Serial.print(",");
  Serial.print(quat.y(), 6);
  Serial.print(",");
  Serial.print(quat.z(), 6);
  Serial.print(" Z ");
  Serial.print(currentTag);
  Serial.print(" BTN ");
  Serial.print(buttonPressed);
  Serial.print(" SEQ ");
  Serial.println(sequenceNumber++);
}
