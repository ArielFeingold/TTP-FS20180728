class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.integer :user_shares
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
