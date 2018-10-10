class TradesController < ApplicationController
before_action :authenticate_user ,only: :index

def index
  trades = current_user.trades
  render status: 200, json: {trades: trades}
end

end
