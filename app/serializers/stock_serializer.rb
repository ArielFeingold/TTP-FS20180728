class StockSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :user_shares
end
