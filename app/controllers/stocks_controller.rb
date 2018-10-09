require 'pry-remote'
class StocksController < ApplicationController

  def create
    stock = Stock.find_by(symbol: stock_params[:symbol].upcase)
    if stock
      stock.update({user_shares: stock.user_shares + stock_params[:user_shares].to_i})
    else
      stock = Stock.new(stock_params)
    end
      trade_amount = stock_params[:user_shares].to_i * stock_params[:stock_price].to_i
      trade = stock.trades.build(user_id: current_user.id, amount: trade_amount, price: stock_params[:stock_price])
      if stock.save && trade.save
        render status: 200, json: {message: "Trade Successful"}
      else
        render status: 400, json: {error: "Something went wrong"}
      end
    end


private

  def stock_params
    params.permit(:user_id, :user_shares, :symbol)
  end
end
