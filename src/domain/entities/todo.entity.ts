
export class TodoEntity {
	constructor(
		public id: number,
		public text: string,
		public completedAt?: Date|null,
	) {}

	get isCompleted(){
		return !!this.completedAt;
	}

	public static fromObject( object: {[key: string]: any} ): TodoEntity{
		const { id, text, completedAt } = object;
		if ( !id ) throw 'Id is required';
		if ( !text ) throw 'Text is required';

		let newCompletedAt: Date | null = null;

		if ( completedAt !== null && completedAt !== undefined) { 
			newCompletedAt = new Date(completedAt);
			if( isNaN( newCompletedAt.getTime() )){
				throw 'CompletedAt is not a valid date'
			}
		}

		return new TodoEntity( id, text, newCompletedAt )
	}
}