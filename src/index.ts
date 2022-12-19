import "reflect-metadata";
import 'source-map-support/register';
import { ChronicleCommandLine } from "./commands/ChronicleCommandLine";

async function main(): Promise<void> {
    const commandLine = new ChronicleCommandLine();
    commandLine.execute();
}

main().catch(reason => console.error(reason));