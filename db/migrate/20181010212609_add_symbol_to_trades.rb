class AddSymbolToTrades < ActiveRecord::Migration[5.2]
  def change
    add_column :trades, :symbol, :string
  end
end
