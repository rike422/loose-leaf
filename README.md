# LooseLeaf [![Build Status](https://travis-ci.org/rike422/loose-leaf.svg?branch=master)](https://travis-ci.org/rike422/loose-leaf) [![Coverage Status](https://coveralls.io/repos/github/rike422/loose-leaf/badge.svg?branch=master)](https://coveralls.io/github/rike422/loose-leaf?branch=master) [![Code Climate](https://codeclimate.com/github/rike422/loose-leaf/badges/gpa.svg)](https://codeclimate.com/github/rike422/loose-leaf) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


LooseLeaf is a Rails Engine that allows Real-Time collaboration between users.

LooseLeaf is still a work in progress, and currently only text attributes may
be collaboratively text editor.

This project inspired by [Collabrate](https://github.com/ball-hayden/Collaborate)

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'together'
```

And then execute:

    $ bundle

## Getting Started

### Prerequisites

You will need to have ActionCable set up. In particular, you will need an
`ApplicationCable::Channel` and `ApplicationCable::Connection`.

More information about setting up ActionCable can be found in its README.

### Model Setup

```ruby
class Document < ActiveRecord::Base
  # Include the LooseLeaf::Document concern
  include LooseLeaf::Document

  # Choose which attributes may be edited collaboratively
  collaborative_attributes :body, :title
end
```

Adding `collaborative_attributes` will define an extra attribute on the model
prefixed with `collaborative_` (e.g `collaborative_body`). We must use that
over `body` whenever we wish to allow realtime collaboration.

Bear in mind that the `collaborative_` attributes are stored only in the Rails
cache. You must save these attributes where appropriate:

```ruby
document = Document.first
document.body = document.collaborative_body
document.save!

# Or, using the commit_collaborative_attributes convenience method:

document.commit_collaborative_attributes(:body)
document.commit_collaborative_attributes(:body, :title)

```

### Channel Setup

You will need to set up a collaboration channel for each model that is being
collaboratively edited.

```ruby
class DocumentChannel < LooseLeaf::CollaborationChannel
  private

  # Set the Model class that we are editing.
  def collaborative_model
    Document
  end
end
```

### View

As mentioned in Model Setup, we must use `collaborative_` attributes over normal
attributes when getting the values of collaborative attributes:

```erb
<%# app/views/documents/show.html.erb %>

<input id="title" type="text" value="<%= @document.collaborative_title %>">

<textarea id="body" rows="8" cols="40"><%= @document.collaborative_body %></textarea>

<%= link_to 'Back', documents_path %>

<script>
var documentId = <%= @document.id %>
</script>
```

### JavaScript 

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

#### Sprockets

Add `loose-leaf` to your `application.coffee` asset, after actionable:

```coffeescript
#= require cable
#= require loose-leaf
```

Then, wherever appropriate:

```js

// Create a new ActionCable consumer
const cable = Cable.createConsumer('ws://localhost:28080')

// Set up our collaboration object. `documentId` is (as you may expect) the ID
// of the document that is being edited.
const looseLeaf = new LooseLeaf(cable, 'DocumentChannel', documentId)

// We now specify the two attributes we are editing.
collaborativeTitle = looseLeaf.addAttribute('title')
collaborativeBody = looseLeaf.addAttribute('body')

new LooseLeaf.Adapters.TextAreaAdapter(collaborativeTitle, '#title')
new LooseLeaf.Adapters.TextAreaAdapter(collaborativeBody, '#body')

```

#### npm or yuan

```
npm install loose-leaf
```
 
