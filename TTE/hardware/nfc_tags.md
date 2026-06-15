# Current NFC Tags

These are the NFC UID values currently compiled into `hardware/probe_xiao_wired.ino`.

| Tag | UID |
| --- | --- |
| TAG1 | `{0x53, 0x15, 0x96, 0x4B, 0x74, 0x00, 0x01}` |
| TAG2 | `{0x53, 0x38, 0x91, 0x4B, 0x74, 0x00, 0x01}` |
| TAG3 | `{0x53, 0x74, 0x8D, 0x4B, 0x74, 0x00, 0x01}` |
| TAG4 | `{0x53, 0x41, 0x84, 0x4B, 0x74, 0x00, 0x01}` |
| TAG5 | `{0x53, 0xF3, 0x7E, 0x4B, 0x74, 0x00, 0x01}` |

## Future NFC Tag Updates

1. Scan the UID for each replacement NFC tag.
2. Open `hardware/probe_xiao_wired.ino`.
3. Edit only the `TAGS[]` array, keeping the order mapped to `TAG1` through `TAG5`.
4. Copy the same UID values into this file for traceability.
5. Upload the updated firmware to the Seeed Studio XIAO ESP32-S3.
6. Test the serial output and confirm the zone field reports the expected `TAG1` to `TAG5` value.
