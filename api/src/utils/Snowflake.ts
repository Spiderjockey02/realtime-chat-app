// Creation date 17th July 2022
const EPOCH_TIME = 1658012400000;

export type SnowflakeInput = {
	workerId?: number
	processId?: number
}

export default new class Snowflake {
	workerId: number;
	processId: number;
	increment:number;

	constructor({ workerId = 1, processId = 1 }: SnowflakeInput = {}) {
		this.workerId = workerId;
		this.processId = processId;
		this.increment = 0;

	}

	get getWorkerId() {
		if (this.workerId >= 31) throw new Error('WorkerId is higher than 31 for this process');
		return this.workerId.toString(2);
	}

	get getProcessId() {
		if (this.processId >= 31) throw new Error('processId is higher than 31 for this process');
		return this.processId.toString(2);
	}

	generate() {
		// Make sure not to go over the 12 bit number
		this.increment = (this.increment == 4095) ? 0 : this.increment;

		// Create long binary to be converted into id
		const binary = `${(Date.now() - EPOCH_TIME).toString(2)}${String(this.getWorkerId).padStart(5, '0')}${String(this.getProcessId).padStart(5, '0')}${String(this.increment).padStart(12, '0')}`;
		console.log(binary);
		return parseInt(binary, 2);
	}

	destructure(id: number) {
		// Destructure the Snowflake to get it's information
		return {
			startDate: new Date(Number(BigInt(id) >> 22n) + EPOCH_TIME),
			workerId: this.workerId,
			processId: this.processId,
		};
	}
};
