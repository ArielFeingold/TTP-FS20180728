require 'pry-remote'
class UsersController < ApplicationController
    before_action :authenticate_user, only: [:index, :show, :update]

  def create
    user = User.new(user_params)

    if user.save && user.create_balance
      render status: 200, json: { user: user}
    else
      render status: 400, json: { error: user.errors.messages}
    end
  end

  def show
    user = User.find_by(id: params[:id])
    render status: 200, json: user
  end

  def update
    binding.remote_pry
    user = User.find_by(id: params[:id])
    if user.update(user_params)
      render status: 200, json: {message: "Update Successful"}
    else
      render status: 400, json: {error: "Something went wrong"}
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
