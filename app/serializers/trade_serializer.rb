class TradeSerializer < ActiveModel::Serializer
  attributes :id, :amount, :price
end
