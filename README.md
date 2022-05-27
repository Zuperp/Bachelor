# Bachelor

This is a react native expo run app.

You need android studio to start and run an emulator for the app

You need to run the python file for the server so start running.

Becuase the emulator doesn't support everything a real phone does, you need to adapt the host for the correct ipv4 address for it to work.

If connected correctly, selecting a county, ticking 1-4 boxes base on the illness you want to represent you have, and pressing send, the phone APP will send a POST request to the python flask server.

The python flask server reads the JSON message, and updates the table with a single count towards each of the illnesses you selected, for the county you selected.

The python database is prepopulated with data collected from "statistik banken" which results in the database having all counties and the total population of that county in it.
