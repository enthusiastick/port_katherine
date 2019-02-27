class Admin::Event::IndexSerializer < ActiveModel::Serializer
  attributes :dates, :name, :slug
end
