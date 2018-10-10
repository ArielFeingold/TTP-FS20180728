require 'pry-remote'
class StocksController < ApplicationController
  before_action :authenticate_user ,only: :create

  def create
    user = User.find_by(id: params[:user_id])
    trade_amount = params[:user_shares].to_i * params[:stock_price].to_f
    stock = Stock.find_by(symbol: stock_params[:symbol], user_id: params[:user_id])
    if stock != nil
      stock.user_shares = stock.user_shares + stock_params[:user_shares].to_i
    else
      stock = Stock.new(stock_params)
    end
    trade = stock.trades.build(user_id: current_user.id, amount: params[:user_shares], price: params[:stock_price])
    new_balance = (current_user.balance.balance - trade_amount)
    user.balance.balance = new_balance
      if stock.save && trade.save && user.balance.save
        render status: 200, json: {stocks: user.stocks, balance: user.balance}
      else
        render status: 400, json: {error: "Something went wrong"}
      end
    end


private

  def stock_params
    params.permit(:user_id, :user_shares, :symbol)
  end
end
