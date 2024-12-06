const path = require('node:path');
const fs = require('node:fs/promises');

const foo = async () => {
    const baseFolder = path.join(process.cwd(), 'baseFolder');

    for (let i = 1; i <= 5; i++) {
        const subFolder = path.join(baseFolder, `folder${i}`);
        await fs.mkdir(subFolder, { recursive: true });

        for (let j = 1; j <= 5; j++) {
            const filePath = path.join(subFolder, `file${j}.txt`);
            await fs.writeFile(filePath, `This is file ${j} in folder ${i}`);
        }
    }

    async function printFolderContents(folderPath) {
        const contents = await fs.readdir(folderPath, { withFileTypes: true });

        for (const item of contents) {
            const itemPath = path.join(folderPath, item.name);
            const isDirectory = item.isDirectory();

            console.log(`${itemPath} - ${isDirectory ? 'Folder' : 'File'}`);

            if (isDirectory) {
                await printFolderContents(itemPath);
            }
        }
    }

    await printFolderContents(baseFolder);
}

void foo();

