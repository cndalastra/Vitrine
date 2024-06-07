import pandas as pd
import qrcode
from PIL import Image

# Dados diretamente extraídos da imagem fornecida
data = {
    "URL": [
        "https://www.apiserverater.online/p1/p1.html",
        "https://www.apiserverater.online/p2/p2.html",
        "https://www.apiserverater.online/p3/p3.html",
        "https://www.apiserverater.online/p4/p4.html",
        "https://www.apiserverater.online/p5/p5.html",
        "https://www.apiserverater.online/p6/p6.html",
        "https://www.apiserverater.online/p7/p7.html",
        "https://www.apiserverater.online/p8/p8.html",
        "https://www.apiserverater.online/p9/p9.html",
        "https://www.apiserverater.online/p10/p10.html",
        "https://www.apiserverater.online/p11/p11.html",
        "https://www.apiserverater.online/p12/p12.html",
        "https://www.apiserverater.online/p13/p13.html",
        "https://www.apiserverater.online/p14/p14.html",
        "https://www.apiserverater.online/p15/p15.html",
        "https://www.apiserverater.online/p16/p16.html",
        "https://www.apiserverater.online/p17/p17.html",
        "https://www.apiserverater.online/p18/p18.html",
        "https://www.apiserverater.online/p19/p19.html",
        "https://www.apiserverater.online/p20/p20.html",
        "https://www.apiserverater.online/p21/p21.html",
        "https://www.apiserverater.online/p22/p22.html",
        "https://www.apiserverater.online/p23/p23.html",
        "https://www.apiserverater.online/p24/p24.html",
        "https://www.apiserverater.online/p25/p25.html",
    ],
    "Filename": [
        "q1.png",
        "q2.png",
        "q3.png",
        "q4.png",
        "q5.png",
        "q6.png",
        "q7.png",
        "q8.png",
        "q9.png",
        "q10.png",
        "q11.png",
        "q12.png",
        "q13.png",
        "q14.png",
        "q15.png",
        "q16.png",
        "q17.png",
        "q18.png",
        "q19.png",
        "q20.png",
        "q21.png",
        "q22.png",
        "q23.png",
        "q24.png",
        "q25.png",
    ]
}

# Converting to a DataFrame
df = pd.DataFrame(data)

# Generate QR codes
for index, row in df.iterrows():
    # Create QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(row['URL'])
    qr.make(fit=True)

    # Create an image from the QR Code instance
    img = qr.make_image(fill='black', back_color='white')
    img = img.resize((500, 500))

    # Save the image
    img.save(row['Filename'])

print("QR codes generated successfully")
