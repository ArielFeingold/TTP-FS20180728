class CreateBalances < ActiveRecord::Migration[5.2]
  def change
    create_table :balances do |t|
      t.float :balance, default: 5000.00
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
