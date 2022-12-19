import { CommandLineAction } from "@rushstack/ts-command-line";
import { LogsActionController } from "./LogsActionController";

export class LogsAction extends CommandLineAction {

    private readonly _controller: LogsActionController;

    public constructor(controller: LogsActionController) {
        super({
            actionName: 'stream',
            summary: 'Streams logs from the requested container.',
            documentation: 'Streams logs from the requested container.'
        });

        this._controller = controller;
    }

    protected override onDefineParameters(): void {
        
    }

    protected async onExecute(): Promise<void> {
        return await this._controller.execute({
            
        });
    }

}