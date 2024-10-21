const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // ให้บริการไฟล์ในโฟลเดอร์ public

// Endpoint สำหรับบันทึกรหัสลงใน wishes.json
app.post('/save-wish', (req, res) => {
    const newCode = req.body.code;

    // อ่านไฟล์ wishes.json
    fs.readFile('wishes.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }

        let wishes = JSON.parse(data);
        wishes.push({ code: newCode, used: false }); // เพิ่มรหัสใหม่

        // เขียนไฟล์ wishes.json ใหม่
        fs.writeFile('wishes.json', JSON.stringify(wishes, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing file');
            }

            res.send({ message: 'Wish saved successfully' });
        });
    });
});

// Endpoint สำหรับส่งรหัสทั้งหมดใน wishes.json ไปที่หน้า joincode
app.get('/get-wishes', (req, res) => {
    fs.readFile('wishes.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }

        let wishes = JSON.parse(data);
        res.send(wishes); // ส่งข้อมูลรหัสทั้งหมดไปที่ joincode
    });
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
