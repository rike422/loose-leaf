class CreateNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :notes do |t|
      t.string :title
      t.string :body
      t.string :short_id, null: false

      t.timestamps
    end
    add_index :notes, :short_id, unique: true
  end
end
