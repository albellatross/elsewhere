
import fs from 'fs';
import path from 'path';

const MIGRATIONS_DIR = './supabase/migrations';
const ARCHIVE_DIR = './supabase/migrations/archive';

async function main() {
    if (!fs.existsSync(ARCHIVE_DIR)) {
        fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
    }

    const files = fs.readdirSync(MIGRATIONS_DIR);

    for (const file of files) {
        if (file.endsWith('.sql')) {
            // Keep new files from today (using strict string check of prefix)
            if (file.startsWith('20260121')) {
                console.log(`Keeping potential new migration: ${file}`);
                continue;
            }

            console.log(`Archiving legacy: ${file}`);
            fs.renameSync(
                path.join(MIGRATIONS_DIR, file),
                path.join(ARCHIVE_DIR, file)
            );
        }
    }
    console.log("Archive complete.");
}

main();
