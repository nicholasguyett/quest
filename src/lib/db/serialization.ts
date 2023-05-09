import type { DBCore, DBCoreTable, DBCoreTableSchema, Middleware, TableSchema } from 'dexie';
import { get } from 'svelte/store';

export interface Serializable {
	toJSON?: () => string;
}

/**
 * Adds improved serialization/deserialization support by ensuring the constructor is called
 * on reads and `toJSON` when saved, if present.
 */
export function useSerialization<Builder extends (val: any) => any>(
	tableClassMap: Record<string, Builder>
): Middleware<DBCore> {
	return {
		stack: 'dbcore',
		name: 'Serialization',
		create(downlevelDatabase) {
			// DBCore is not inheritable, so we're going a little old-school
			const updatedDatabase: DBCore = Object.create(downlevelDatabase);

			updatedDatabase.table = function table(tableName) {
				const downlevelTable = downlevelDatabase.table(tableName);

				// Clone the downlevel implementation so we can modify it
				const updatedTable: DBCoreTable = Object.create(downlevelTable);

				// Intercept all puts and adds to ensure they are serialized correctly
				updatedTable.mutate = function mutate(req) {
					switch (req.type) {
						case 'add':
						case 'put':
							return downlevelTable.mutate({
								...req,
								values: req.values.map((val: Serializable) => {
									// Use the value's custom serialization logic, if present
									if (val.toJSON) return val.toJSON();
									else return val;
								})
							});
						default:
							return downlevelTable.mutate(req);
					}
				};

				// Actually map results to the provided class
				updatedTable.get = async function get(req) {
					const builder = tableClassMap[this.schema.name];
					const res = await downlevelTable.get(req);

					// Use the mapped class for deserialization, if available
					if (builder) {
						return builder(res);
					} else {
						return res;
					}
				};

				updatedTable.getMany = async function getMany(req) {
					const builder = tableClassMap[this.schema.name];
					const res = await downlevelTable.getMany(req);

					// Use the mapped class for deserialization, if available
					if (builder) {
						return res.map(builder);
					} else {
						return res;
					}
				};

				updatedTable.query = async function query(req) {
					const builder = tableClassMap[this.schema.name];
					const res = await downlevelTable.query(req);

					if (builder) {
						return {
							...res,
							result: res.result.map(builder)
						};
					} else {
						return res;
					}
				};

				return updatedTable;
			};

			return updatedDatabase;
		}
	};
}
