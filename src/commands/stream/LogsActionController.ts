import { Logger } from "@baileyherbert/logging";
import { ChronicleClient } from "../../client/ChronicleClient";

/**
 * The application service responsible for handling invocations of the `stream` command.
 */
export class LogsActionController {

    private readonly _logger: Logger;

    private readonly _client: ChronicleClient;

    public constructor(logger: Logger, client: ChronicleClient) {
        this._logger = logger;
        this._client = client;
    }

    public async execute(options: ILogsActionOptions): Promise<void> {
        const response = this._client.streamLogs();
        
        for await (const message of response) {
            console.log(`Received message:`, message.contents);
        }
    }

}

export interface ILogsActionOptions {

}