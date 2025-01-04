"use client";

import { useState, FormEvent } from "react";

interface EmailEditorProps {
  recipientEmail: string;
}

const EmailEditor: React.FC<EmailEditorProps> = ({ recipientEmail }) => {
  const [text, setText] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject,
          content: text,
        }),
      });

      if (response.ok) {
        alert("邮件发送成功！");
        setText("");
        setSubject("");
      } else {
        throw new Error("发送失败");
      }
    } catch (error) {
      alert("发送失败，请重试");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-[600px] bg-white rounded-lg shadow-xl border border-gray-300">
      {/* 顶部工具栏 */}
      <div className="px-4 py-2 bg-gray-100 rounded-t-lg border-b border-gray-300 flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        {/* 收件人区域 */}
        <div className="mb-2 flex items-center border-b border-gray-300 py-2">
          <span className="text-sm text-gray-600 w-14">收件人</span>
          <div className="flex-1 ml-2">
            <div className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">
              {recipientEmail}
            </div>
          </div>
        </div>

        {/* 主题区域 */}
        <div className="flex items-center border-b border-gray-300 py-2">
          <span className="text-sm text-gray-600 w-14">主题</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 ml-2 text-sm focus:outline-none"
            placeholder="添加主题"
          />
        </div>

        {/* 内容区域 */}
        <div className="mt-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-[300px] text-sm focus:outline-none resize-none"
            placeholder="撰写邮件"
          />
        </div>

        {/* 底部工具栏 */}
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              disabled={isSending || !text.trim() || !subject.trim()}
              className="bg-[#0b57d0] text-white px-6 py-2 rounded-full hover:bg-[#0842a0] disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isSending ? "发送中..." : "发送"}
            </button>
            <button
              type="button"
              onClick={() => {
                setText("");
                setSubject("");
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailEditor;
