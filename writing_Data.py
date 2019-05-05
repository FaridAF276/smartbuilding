import paho.mqtt.client as mqtt
import os
import xml.etree.cElementTree as et

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    # Subscribing in on_connect() - if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("chambre/potentiometre")
    client.subscribe("sdb/waterlevel")
    client.subscribe("sdb/humidity")
    client.subscribe("salon/light")
    client.subscribe("salon/window")
    client.subscribe("salon/rain")
    client.subscribe("room/device")

def on_message(client, userdata, msg):
    print("Message recu "+msg.topic+" "+str(msg.payload))

    base_path = os.path.dirname(os.path.realpath(__file__))
    # print(base_path)

    xml_file = os.path.join(base_path, "sensordata.xml")

    tree = et.parse(xml_file)
    root = tree.getroot()
    if msg.topic == "chambre/potentiometre":
        print("Dans le potentiometre dans le sujet chambre")

        for child in root.iter('sensors'):
            for sec in child.iter('chambre'):
                for temperature in sec.iter('resistance'):
                        new_res = str(msg.payload)
                        temperature.text = new_res
                        # print("On ecrit dans le fichier")
        tree.write(xml_file)

        print("Nouveau fichier xml")
        for child in root:
            for sec in child.iter('chambre'):
            # print(sec.tag, sec.attrib)
                for element in sec.iter('resistance'):
                    print("Dans le nouveau fichier xml "+ element.tag + " : "+ " : "+ element.text)


    if msg.topic == "sdb/waterlevel":
        print("Dans le potentiometre dans le sujet sdb")

        for child in root.iter('sensors'):
            for sec in child.iter('sdb'):
                for waterlvl in sec.iter('floodDetection'):
                    new_water = str(msg.payload)
                    waterlvl.text = new_water
                    # print("On ecrit dans le fichier")

        tree.write(xml_file)
        print("Nouveau fichier xml")

        for child in root.iter('sensors'):
            for sec in child.iter('sdb'):
                for element in sec.iter('floodDetection'):
                    print("Dans le nouveau fichier xml " + element.tag + " : " + " : " + element.text)

    if msg.topic == "sdb/humidity":
        print("Dans l'humidite dans le sujet sdb")

        for child in root.iter('sensors'):
            for sec in child.iter('sdb'):
                for humidite in sec.iter('humidity'):
                    new_hum = str(msg.payload)
                    humidite.text = new_hum
                    # print("On ecrit dans le fichier")

        tree.write(xml_file)
        print("Nouveau fichier xml")

        for child in root.iter('sensors'):
            for sec in child.iter('sdb'):
                for element in sec.iter('humidity'):
                    print("Dans le nouveau fichier xml " + element.tag + " : " + " : " + element.text)

    if msg.topic == "salon/light":
        print("Lumieres du salon allumees")

        for child in root.iter('sensors'):
            for sec in child.iter('salon'):
                for lights in sec.iter('extBrightness'):
                    new_light = str(msg.payload)
                    lights.text = new_light
                    # print("On ecrit dans le fichier")

        # tree.write(xml_file)
        # print("Nouveau fichier xml")
        #
        # for child in root.iter('sensors'):
        #     for sec in child.iter('salon'):
        #         for element in sec.iter('extBrightness'):
        #             print("Dans le nouveau fichier xml " + element.tag + " : " + " : " + element.text)


    if msg.topic == "salon/window":
        print("Fenetres du salon ouvertes ")

        for child in root.iter('sensors'):
            for sec in child.iter('salon'):
                for wind in sec.iter('opencloseWindow'):
                    new_state = str(msg.payload)
                    wind.text = new_state
                    # print("On ecrit dans le fichier")

        # tree.write(xml_file)
        # print("Nouveau fichier xml")
        #
        # for child in root.iter('sensors'):
        #     for sec in child.iter('salon'):
        #         for element in sec.iter('opencloseWindow'):
        #             print("Dans le nouveau fichier xml " + element.tag + " : " + " : " + element.text)


    if msg.topic == "salon/rain":
        print("Detecter de l'eau ")

        for child in root.iter('sensors'):
            for sec in child.iter('salon'):
                for pluie in sec.iter('rainDetect'):
                    new_pluie = str(msg.payload)
                    pluie.text = new_pluie
                    # print("On ecrit dans le fichier")

        # tree.write(xml_file)
        # print("Nouveau fichier xml")
        #
        # for child in root.iter('sensors'):
        #     for sec in child.iter('salon'):
        #         for element in sec.iter('rainDetect'):
        #             print("Dans le nouveau fichier xml " + element.tag + " : " + " : " + element.text)
    tree.write(xml_file)
    print("Nouveau fichier xml")

client = mqtt.Client()
print("Hello")
client.on_connect = on_connect
client.on_message = on_message

client.connect("192.168.4.1", 1883, 60)
# Process network traffic and dispatch callbacks. This will also handle
# reconnecting. Check the documentation at
# https://github.com/eclipse/paho.mqtt.python
# for information on how to use other loop*() functions
client.loop_forever()
