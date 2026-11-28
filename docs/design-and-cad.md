# Design and CAD

The dryer was modelled in SOLIDWORKS 2026 (Academic).

![Assembly](../media/cad/cad-assembly.jpg)

## Parts

| File | Description |
|---|---|
| `cad/part-1-base.SLDPRT` | Base table: round top on a braced mild-steel square-tube stand, centre hole for the shaft |
| `cad/part-2-rotating-rack.SLDPRT` | Rotating rack: cross base of square tubes, tiered tower arms with tray-locating plates |
| `cad/inner-ring.SLDPRT`, `cad/outer-ring.SLDPRT`, `cad/ball.SLDPRT` | Ball bearing parts for the shaft support |
| `cad/tooth.SLDPRT` | Sprocket / gear tooth part |

![Base table](../media/cad/cad-base-table.png)
![Rotating rack](../media/cad/cad-rotating-rack.png)

## Dome (STEP assembly)

| File | Description |
|---|---|
| `cad/dome/Solar_Dome_7_Panel_Assembly.step` | Dome assembly — 7 separate curved panel components around the base |
| `cad/dome/Solar_Dome_7_Panel_Assembly_Fused.step` | Same dome as one fused solid |
| `cad/dome/Dome_Panel_1.step` … `cad/dome/Dome_Panel_7.step` | Individual curved panels |
| `cad/dome/README-dome.txt` | Model notes |

| Dome parameter | Value (CAD) |
|---|---|
| Shape | Spherical cap (sphere radius ≈ 688.5 mm) |
| Base diameter | 1300 mm |
| Height | 450 mm |
| Top opening | Ø250 mm — fitted with a ventilation fan on a round mounting ring |
| Panel thickness | 2.5 mm |
| Number of panels | 7 |

STEP files open directly in SolidWorks (File → Open → STEP) and keep the 7 panels as separate components.

![Dome top with ventilation fan](../media/photos/dome-top-ventilation-fan.jpg)

## Specification

| Item | Value |
|---|---|
| Dryer type | Direct (greenhouse-type) solar dryer with rotating rack |
| Cover | Transparent spherical-cap dome, 7 curved panels, metal ribs |
| Base | Round tabletop on MS square-tube stand |
| Rack | MS square tube, cross base + tiered towers |
| Trays | GI sheet, sector-shaped, 4 per ring |
| Rack support | Swivel casters on the tabletop |
| Drive | Geared DC motor → chain and sprockets → central shaft |
| Tabletop diameter | *to be added from drawing* |
| Dome height | 450 mm (CAD) |
| Dome base diameter | 1300 mm (CAD) |
| Dome top opening | Ø250 mm with ventilation fan |
| Tray levels / total tray area | *to be added* |
| Rack speed | *to be measured* |
| Motor rating / power source | *to be added* |
