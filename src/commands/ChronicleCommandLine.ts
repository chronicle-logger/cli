import { Logger } from "@baileyherbert/logging";
import { LogLevel } from "@baileyherbert/logging/dist/enums/LogLevel";
import { CommandLineFlagParameter, CommandLineParser } from "@rushstack/ts-command-line";
import { ChronicleClient } from "../client/ChronicleClient";
import { LogsAction } from "./stream/LogsAction";
import { LogsActionController } from "./stream/LogsActionController";

export class ChronicleCommandLine extends CommandLineParser {
    
    private readonly _logger: Logger;

    private _verbose!: CommandLineFlagParameter;

    public constructor() {
        super({
            toolFilename: 'chronicle',
            toolDescription: 'A command line interface for interacting with Chronicle Server instances.'
        });

        this._logger = new Logger();

        const chronicleClient = new ChronicleClient({
            host: '127.0.0.1',
            port: 3000,
            accessToken: 'abc123'
        });

        const streamLogsController = new LogsActionController(
            this._logger,
            chronicleClient
        );

        const streamLogsAction = new LogsAction(streamLogsController);
        
        this.addAction(streamLogsAction);
    }

    protected override onDefineParameters(): void {
        this._verbose = this.defineFlagParameter({
            parameterLongName: '--verbose',
            parameterShortName: '-v',
            description: 'Enables additional details in logging'
        });
    }

    protected override onExecute(): Promise<void> {
        this._logger.createConsoleTransport(this._verbose ? LogLevel.Trace : LogLevel.Information);
        return super.onExecute();
    }
    
} 