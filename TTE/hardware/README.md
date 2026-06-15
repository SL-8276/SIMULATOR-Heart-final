# Wired Probe Firmware

This folder stores the maintained hardware firmware source for the Interactive TTE Simulator wired probe. The firmware reads probe orientation from a BNO055 IMU, reads calibration zone NFC tags through a PN532 reader, reads the probe button, and streams parser-compatible serial packets to the Electron app.

Warning: do not lose this file. `probe_xiao_wired.ino` is the maintained hardware source code for the probe.

## Hardware

Board: Seeed Studio XIAO ESP32-S3

## Required Arduino Libraries

- Adafruit BNO055
- Adafruit PN532
- Adafruit Unified Sensor

## Serial

Baud rate: `460800`

Output format:

```text
Q qw,qx,qy,qz Z TAGx BTN b SEQ n
```

Example:

```text
Q 0.998120,0.012300,-0.041200,0.031000 Z TAG3 BTN 0 SEQ 1842
```

Do not change this format unless the Electron serial parser is updated at the same time.

## Pin Mapping

| Device | Signal | XIAO ESP32-S3 Pin |
| --- | --- | --- |
| BNO055 | SDA | D4 |
| BNO055 | SCL | D5 |
| PN532 | SCK | D8 |
| PN532 | MOSI | D10 |
| PN532 | MISO | D9 |
| PN532 | SS | D2 |
| Button | BTN | D1 |

## Replacing NFC Tags

1. Scan each new NFC tag UID.
2. Open `hardware/probe_xiao_wired.ino`.
3. Replace the UID values in the `TAGS[]` array.
4. Keep the tag order as `TAG1` through `TAG5`.
5. Update `hardware/nfc_tags.md` with the same UID values.
6. Upload the firmware to the Seeed Studio XIAO ESP32-S3.
7. Confirm the serial output still follows `Q qw,qx,qy,qz Z TAGx BTN b SEQ n`.

Current tag values are also documented in `hardware/nfc_tags.md`.
