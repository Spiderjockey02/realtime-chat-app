export type SnowflakeInput = {
	startDate?: number
	workerId?: number
	processId?: number
}

export class Snowflake {
	startDate: number;
	workerId: number;
	processId: number;
	increment:number;

	constructor({ startDate = Date.now(), workerId = 0, processId = 0 }: SnowflakeInput) {
		this.startDate = startDate;
		this.workerId = workerId;
		this.processId = processId;
		this.increment = 0;
	}

	get generate() {
		this.increment++;
		const binary = `${(this.startDate.toString(2))}${this.getWorkerId}${this.getProcessId}${this.increment}`;
		return parseInt(binary, 2);
	}

	get getWorkerId() {
		if (this.workerId >= 31) throw new Error('WorkerId is higher than 31 for this process');
		return (this.workerId).toString(2);
	}

	get getProcessId() {
		if (this.processId >= 31) throw new Error('processId is higher than 31 for this process');
		return (this.processId).toString(2);
	}
}
