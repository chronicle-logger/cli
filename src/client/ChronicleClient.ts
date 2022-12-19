import { Channel, createChannel, createClient, Metadata } from "nice-grpc";
import { LogMessage, LogServiceClient, LogServiceDefinition } from "./proto/chronicle";

export class ChronicleClient {

    private readonly _options: ChronicleClientOptions;

    private readonly _channel: Channel;

    private readonly _logServiceClient: LogServiceClient;

    private readonly _metadata: Metadata;

    public constructor(options: ChronicleClientOptions) {
        this._options = options;
        this._channel = createChannel(`${this._options.host}:${this._options.port}`);
        this._logServiceClient = createClient(LogServiceDefinition, this._channel);
        this._metadata = Metadata({
            Authorization: `Bearer ${this._options.accessToken}`
        })
    }

    public async getLogs(): Promise<string> {
        const logs = await this._logServiceClient.getLogs({ containerId: 'Hello' }, {
            metadata: this._metadata
        });

        return logs.contents;
    }

    public streamLogs(): AsyncIterable<LogMessage> {
        const logStream = this._logServiceClient.streamLogs({ containerId: 'Hello' }, {
            metadata: this._metadata
        });

        return logStream;
    }

}

export interface ChronicleClientOptions {
    readonly host: string;
    readonly port: number;
    readonly accessToken: string;
}