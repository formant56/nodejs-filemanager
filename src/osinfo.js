import os from "os"


export const displayOSInfo = (option)=> {
    switch (option) {
        case '--EOL': {
            console.log('System End-Of-Line (EOL):', JSON.stringify(os.EOL));
            break;
        }
        case '--cpus': {
            const cpus = os.cpus();
            console.log(`Total CPUs: ${cpus.length}`);
            cpus.forEach((cpu, index) => {
                console.log(`CPU ${index + 1}: Model - ${cpu.model}, Speed - ${(cpu.speed / 1000).toFixed(2)} GHz`);
            });
            break;
        }
        case '--homedir': {
            console.log('Home Directory:', os.homedir());
            break;
        }
        case '--username': {
            const userInfo = os.userInfo();
            console.log('Current System Username:', userInfo.username);
            break;
        }
        case '--architecture': {
            console.log('CPU Architecture:', os.arch());
            break;
        }
        default: {
            console.log('Invalid input. Available options are: --EOL, --cpus, --homedir, --username, --architecture');
        }
    }}