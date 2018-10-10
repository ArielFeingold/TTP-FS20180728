class UserSerializer < ActiveModel::Serializer
  attributes :username
  has_many :stocks
  has_one :balance
end
