require 'rails_helper'

module LooseLeaf
  RSpec.describe Document, type: :model do
    let(:example_class) { ::Document }
    let(:short_id_class) { ::Note }
    let(:example_instance) { example_class.create! }

    describe '#collaborative_attributes' do
      it 'should allow collaborative attributes do be defined' do
        expect(example_class.collaborative_attributes).to match_array %w(title body)
      end

      it 'should define getters for collaborative_attributes' do
        expect(example_instance).to receive_message_chain(:collaborative_attribute, value: 'Test')
        expect(example_instance.collaborative_body).to eq 'Test'
      end

      it 'should define setters for collaborative_attributes' do
        expect(example_instance).to receive_message_chain(:collaborative_attribute, :'value=')
        example_instance.collaborative_body = 'something'
      end
    end

    describe '#collaborative_key' do
      it 'should allow collaborative_key do be defined' do
        expect(short_id_class.collaborative_key).to eq :short_id
      end
      context 'when collaborative_key is not called' do
        it 'should return a default id' do
          expect(example_class.collaborative_key).to eq :id
        end
      end
    end

    describe 'find_by_collaborative_key' do
      let(:mock_value) { 1 }
      it 'should find by collaborative_key' do
        allow(example_class).to receive(:find_by)
        example_class.find_by_collaborative_key(mock_value)
        expect(example_class).to(
          have_received(:find_by).with(
            id: mock_value
          )
        )
      end
    end

    describe '#update_attributes' do
      it 'should update the cache following an update_attribute / update_attributes' do
        example_instance.update_attribute(:body, 'Test Body')
        expect(example_instance.collaborative_body).to eq 'Test Body'

        example_instance.update_attributes(body: 'Another Body')
        expect(example_instance.collaborative_body).to eq 'Another Body'
      end

      it 'should allow me to persist collaborative attributes' do
        example_instance.collaborative_body = 'A test body'

        example_instance.body = example_instance.collaborative_body
        example_instance.save!

        example_instance.reload

        expect(example_instance.body).to eq 'A test body'
      end

      it 'should provide a convenience method for persisting attributes' do
        example_instance.collaborative_body = 'A test body'

        expect(example_instance.commit_collaborative_attributes(:body)).to eq true

        example_instance.reload

        expect(example_instance.body).to eq 'A test body'
      end

      it 'should allow me to pass an array to commit_collaborative_attributes' do
        example_instance.collaborative_body = 'A test body'

        expect(example_instance.commit_collaborative_attributes([:body])).to eq true

        example_instance.reload

        expect(example_instance.body).to eq 'A test body'
      end

      it 'should allow me to apply an OT operation to an attribute' do
        example_instance.apply_operation(
          version: 1,
          operation: ['test'],
          attribute: 'body'
        )

        expect(example_instance.collaborative_body).to eq 'test'
      end

      it 'should allow me to clear the collaborative cache' do
        example_instance.collaborative_body = 'test'

        example_instance.clear_collaborative_cache(:body)

        expect(example_instance.collaborative_body).to be_nil
      end
    end
  end
end
