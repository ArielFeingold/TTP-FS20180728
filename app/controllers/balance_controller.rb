class BalanceController < ApplicationController
    before_action :authenticate_user

  def update
    balance = Balance.find_by(id: params[:id])
    balance.balance = balance_params.to_i
    if balance.save
      render status: 200, json: {message: "Update Successful"}
    else
      render status: 400, json: {error: "Something went wrong"}
    end
  end

  private

  def balance_params
    params.require(:balance)
  end

end
