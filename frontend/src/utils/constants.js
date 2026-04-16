export const LANGUAGES = {
  63: {
    label: "JavaScript",
    monacoLang: "javascript",
    icon: "🟨",
    boilerplate:
      'console.log("Hello from JDoodle API!");\n\nfunction fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}\nconsole.log("fib(10) =", fib(10));\n',
  },
  54: {
    label: "C++",
    monacoLang: "cpp",
    icon: "🔵",
    boilerplate:
      '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from JDoodle API!" << endl;\n    return 0;\n}\n',
  },
  71: {
    label: "Python",
    monacoLang: "python",
    icon: "🐍",
    boilerplate:
      'print("Hello from JDoodle API!")\n\ndef fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        print(a, end=" ")\n        a, b = b, a + b\n\nfib(10)\nprint()\n',
  },
};
