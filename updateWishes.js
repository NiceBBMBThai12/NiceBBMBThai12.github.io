const axios = require('axios');

const token = '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'; // ใส่ Personal Access Token ของคุณที่นี่
const repoOwner = 'NiceBBMBThai12'; // ชื่อผู้ใช้ GitHub ของคุณ
const repoName = 'NiceBBMBThai12.github.io'; // ชื่อ repository ของคุณ
const filePath = 'wishes.json'; // ไฟล์ที่คุณต้องการอัปเดต

// ฟังก์ชันสำหรับอัปเดตไฟล์
async function updateFile(newWish) {
    try {
        // 1. ดึงข้อมูลไฟล์เดิม
        const { data: fileData } = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });

        // 2. แปลงข้อมูลจาก base64 เป็น string
        const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
        const wishes = JSON.parse(content);

        // 3. เพิ่มคำอวยพรใหม่
        wishes.push(newWish);

        // 4. แปลงข้อมูลกลับเป็น base64
        const updatedContent = Buffer.from(JSON.stringify(wishes, null, 2)).toString('base64');

        // 5. อัปเดตไฟล์บน GitHub
        await axios.put(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            message: 'Add new birthday wish',
            content: updatedContent,
            sha: fileData.sha // SHA ของไฟล์เดิม
        }, {
            headers: {
                'Authorization': `token ${token}`
            }
        });

        console.log('File updated successfully!');
    } catch (error) {
        console.error('Error updating file:', error);
    }
}

// ตัวอย่างการเรียกใช้ฟังก์ชัน
updateFile({ name: 'John', message: 'สุขสันต์วันเกิด!' });
