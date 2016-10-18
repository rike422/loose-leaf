Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :documents, only: [:index, :new, :update, :destroy]
  get 'documents/:id', to: 'documents#edit'
end
