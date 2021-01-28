class PostsController < ApplicationController
  def index
    @posts = Post.all.order(created_at: :desc)
  end

  def show
    @posts = Post.all.order(created_at: :desc)
    @post = Post.find(params[:id])

    respond_to do |format|
      format.turbo_stream { render turbo_stream: turbo_stream.update("current_post", partial: "post_full_view", locals: { post: @post }) }
      format.html { render :index }
    end
  end

  def new
    @posts = Post.all.order(created_at: :desc)
    @post = Post.new

    respond_to do |format|
      format.turbo_stream { render turbo_stream: turbo_stream.update("current_post", partial: "form", locals: { post: @post }) }
      format.html { render :index }
    end
  end

  def create
    @posts = Post.all.order(created_at: :desc)
    @post = Post.new(post_params)

    if @post.save
      redirect_to post_path(@post.id)
    else
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.update("current_post", partial: "form", locals: { post: @post }) }
        format.html { render :new }
      end
    end
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      redirect_to @post
    else
      render :edit
    end
  end

  private
  
  def post_params
    params.require(:post).permit(:title, :body)
  end
end
