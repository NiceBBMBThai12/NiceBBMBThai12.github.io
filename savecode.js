const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

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
        wishes.push({ code: newCode, used: false }); // เพิ่มรหัสใหม่ พร้อมกับสถานะว่าถูกใช้หรือยัง

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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
