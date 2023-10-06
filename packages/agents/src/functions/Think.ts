import { Agent, AgentFunctionResult, AgentOutputType, ChatMessageBuilder } from "@evo-ninja/agent-utils";
import { AgentFunctionBase } from "../AgentFunctionBase";

interface ThinkFuncParameters { 
  thoughts: string
};

export class ThinkFunction extends AgentFunctionBase<unknown, ThinkFuncParameters> {
  get name(): string {
    return "think";
  }

  get description(): string {
    return "Your current thoughts about the topic.";
  }

  get parameters() {
    return {
      type: "object",
      properties: {
        thoughts: {
          type: "string",
          description: "Your current thoughts about the topic."
        },
      },
      required: ["thoughts"],
      additionalProperties: false
    };
  }

  buildExecutor(agent: Agent<unknown>, context: unknown): (params: ThinkFuncParameters) => Promise<AgentFunctionResult> {
    return async (params: ThinkFuncParameters): Promise<AgentFunctionResult> => {
      return this.onSuccess(params);
    };
  }

  private onSuccess(params: ThinkFuncParameters): AgentFunctionResult {
    return {
      outputs: [
        {
          type: AgentOutputType.Success,
          title: `Thinking...`,
          content: 
            `## Thoughts:\n` +
            `\`\`\`\n` +
            `${params.thoughts}\n` +
            `\`\`\``
        }
      ],
      messages: [
        ChatMessageBuilder.functionCall(this.name, params),
        ChatMessageBuilder.functionCallResult(this.name, "Assistant, please respond."),
      ]
    }
  }
}