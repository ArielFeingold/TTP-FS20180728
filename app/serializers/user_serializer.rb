class UserSerializer < ActiveModel::Serializer
  attributes :username, :balance
  has_many :stocks
  has_one :balance
end
