class CreateTrades < ActiveRecord::Migration[5.2]
  def change
    create_table :trades do |t|
      t.integer :amount
      t.float :price
      t.belongs_to :user, index: true
      t.belongs_to :stock, index: true

      t.timestamps
    end
  end
end
