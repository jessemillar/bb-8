package main

import (
	"fmt"
	"os"
	"time"

	"gobot.io/x/gobot"
	"gobot.io/x/gobot/platforms/ble"
	"gobot.io/x/gobot/platforms/sphero/bb8"
	"gobot.io/x/gobot/platforms/sphero/ollie"
)

var batteryStates = []string{"charging", "battery ok", "battery low", "battery critical"}

func main() {
	bleAdaptor := ble.NewClientAdaptor(os.Args[1])
	bb8 := bb8.NewDriver(bleAdaptor)
	bb8.SetRGB(0, 0, 0)

	work := func() {
		gobot.Every(time.Minute, func() {
			bb8.GetPowerState(func(powerState ollie.PowerStatePacket) {
				fmt.Println("Battery: " + batteryStates[powerState.PowerState-1])

				if powerState.PowerState-1 < 2 {
					bb8.Roll(1, uint16(gobot.Rand(200)))
				}
				// r := uint8(gobot.Rand(255))
				// g := uint8(gobot.Rand(255))
				// b := uint8(gobot.Rand(255))
				// bb8.SetRGB(r, g, b)
			})
		})
	}

	robot := gobot.NewRobot("bb",
		[]gobot.Connection{bleAdaptor},
		[]gobot.Device{bb8},
		work,
	)

	robot.Start()
}
