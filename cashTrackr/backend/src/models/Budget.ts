import { Table, Column, DataType, HasMany, Model } from "sequelize-typescript";
import Expense from "./Expense";

@Table({
  tableName: "budgets",
})
class Budget extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @Column({
    type: DataType.DECIMAL,
  })
  declare amount: number;

  @HasMany(() => Expense, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  declare expenses: Expense[];
  // If removed Budget, remove all the expenses related to it.
  // RESTRICT if you need to remove all expenses related to the budget first.
}

export default Budget;

// A budget can have multiple expenses
// Budget.expenses [array with multiple expenses]
