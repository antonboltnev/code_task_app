<template>
  <div id="app">
    <div class="task">
      <p class="task__title text-align-center large-text text-black">Task 1: No double</p><br><br>
      <span class="underlined">Details: </span> <br>
      <span>Given <span class="bold-text text-black">array [1,6,2,8,6,3,3]</span>. Complete the function so that it
        <span class="bold-text text-black">alerts</span>array, that do not have doubled numbers. And also, sort
        it:)</span><br><br>
    </div>
    <textarea id="editor"
              @blur="getCodeValue"
    >

    </textarea>
    <br><br>
    <button class="run__code" @click="runCode">Execute</button>
  </div>
</template>

<script>
  import CodeMirror from 'codemirror'
  import 'codemirror/theme/dracula.css'
  import 'codemirror/mode/javascript/javascript'
  import 'codemirror/addon/edit/closebrackets'
  import 'codemirror/addon/edit/closetag'
  import 'codemirror/addon/edit/matchbrackets'

  export default {
    name: 'app',
    components: {},
    data: function () {
      return {
        editor: null
      }
    },
    methods: {
      getCodeValue() {
        this.editor.getValue("\n")
      },
      runCode() {
        let code = this.editor.getValue();
        eval(code)
      }
    },
    mounted() {
      this.editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        lineNumbers: true,
        indentWithTabs: true,
        matchBrackets: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        mode: "javascript",
        theme: 'dracula',
        extraKeys: {
          "Tab": "autocomplete"
        }
      });
      this.editor.setValue(
        "let array = [1,6,2,8,6,3,3];\n" +
        "\n" +
        "function noDouble(array) {\n" +
        "\n" +
        "}" +
      "\n" +
          "\nnoDouble(array)"
      )
    },
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px auto;
    max-width: 50%;
  }

  .underlined {
    text-transform: uppercase;
  }

  .task {
    text-align: left;
    color: #808080;

    &__title {
      text-transform: uppercase;
    }
  }

  .CodeMirror pre.CodeMirror-line, .CodeMirror pre.CodeMirror-line-like {
    text-align: left;
  }

  .run__code {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    background: #18a460;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      background: #1bb563;
    }
  }
</style>
