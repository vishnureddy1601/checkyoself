/* jshint ignore: start */
import React from 'react';
import SimpleMDEReact from 'react-simplemde-editor';
import '../simplemde.min.css';
import Popup from 'reactjs-popup';
import { writeGoodComp } from '../helpers/suggestion'
import tippy from 'tippy.js'
import { renderToString } from 'react-dom/server';
import BurgerIcon from './BurgerIcon';
import Menu from './Menu';
import Footer from './Footer';
import '../antd.css';



const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  marginTop: '40px'
};
const contentStyle = {
  background: 'rgba(255,255,255,0)',
  width: '80%',
  border: 'none'
};
const editorStyle = {
  margin: '2em 2em'
};


class Text extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  // extraKeys = () => {
  //   return {
  //     Up: function (cm) {
  //       cm.replaceSelection(' surprise. ');
  //     },
  //     Down: function (cm) {
  //       cm.replaceSelection(' surprise again! ');
  //     }
  //   };
  // };

  handleChange1 = value => {
    const editor = this.inputRef.current
    const { editorEl } = editor;
    const errors = editorEl.querySelectorAll('.cm-spell-error');
    if(errors.length) {
      Array.from(errors).forEach(err => {
        const suggestions = writeGoodComp(err.textContent);
        console.log(suggestions, err.textContent);
        new tippy(err, {
          content: 'Fix this wrong thing',
          placement: 'bottom'
        });
      });
    }
    console.log(errors);
  };


  render() {
    return (
      <div>
        <div>
          <div style={styles}>
            <Popup
              modal
              overlayStyle={{ background: 'rgba(255,255,255,0.98)' }}
              contentStyle={contentStyle}
              closeOnDocumentClick={false}
              trigger={open => <BurgerIcon open={open} />}
            >
              {close => <Menu close={close} />}
            </Popup>


            <SimpleMDEReact
              className="smde-editor-styles"
              editorStyle={editorStyle}
              // suggested={this.editorState}
              label="Markdown Editor"
              onChange={this.handleChange1}
              options={{
                autofocus: false,
                spellChecker: true
                // etc.
              }}
              render={writeGoodComp}
              ref={this.inputRef}
              // The text prop where I passed in the
              // writeGoodSuggestions function
              // Now that I think about it I am
              // not calling this right. I need to add parens at the end of the render prop
              // This would ultimately just render when a user enters grammatically
              // incorrect text
            />
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Text;

