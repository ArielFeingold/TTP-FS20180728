class RemoveBalanceFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :balance, :float
  end
end
