const axios = require('axios');

const token = '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'; // ใส่ Personal Access Token ของคุณที่นี่
const repoOwner = 'NiceBBMBThai12';
const repoName = 'NiceBBMBThai12.github.io';
const filePath = 'wishes.json';

async function updateFile(newWish) {
    try {
        const { data: fileData } = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        
        const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
        const wishes = JSON.parse(content);

        wishes.push(newWish);

        const updatedContent = Buffer.from(JSON.stringify(wishes, null, 2)).toString('base64');

        await axios.put(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            message: 'Add new birthday wish',
            content: updatedContent,
            sha: fileData.sha
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

updateFile({ name: 'John', message: 'สุขสันต์วันเกิด!' });
