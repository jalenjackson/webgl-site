Rails.application.routes.draw do


  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  get '/contact', to: 'contact#index'
  get '/about', to: 'about#index'
  get '/portfolio', to: 'portfolio#index'
  get '/portfolio/project1', to: 'portfolio#project1'
  get '/portfolio/project2', to: 'portfolio#project2'
  get '/portfolio/project3', to: 'portfolio#project3'
  get '/portfolio/project4', to: 'portfolio#project4'
  get '/portfolio/project5', to: 'portfolio#project5'
  get '/portfolio/project6', to: 'portfolio#project6'




end
