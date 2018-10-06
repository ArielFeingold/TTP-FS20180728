class UsersController < ApplicationController
    before_action :authenticate_user, only: [:index, :show]

  def create
    user = User.new(user_params)
    if user.save
      render status: 200, json: { user: user}
    else
      render status: 400, json: { error: user.errors.messages}
    end
  end

  def show
    user = User.find_by(id: params[:id])
    render status: 200, json: user
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
