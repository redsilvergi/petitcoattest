<ul class="snsArea">
  <li class="displaynone">
    <a href="#none" onclick="">
      <img
        src="//img.echosting.cafe24.com/skin/base_en_US/member/btn_naver_login.gif"
        alt="Login with Naver"
      />
    </a>
  </li>
  <li class="displaynone">
    <a href="#none" onclick="">
      <img
        src="//img.echosting.cafe24.com/skin/base_en_US/member/btn_facebook_login.gif"
        alt="Login with Facebook"
      />
    </a>
  </li>
  <li class="displaynone">
    <a href="#none" onclick="">
      <img
        src="//img.echosting.cafe24.com/skin/base_en_US/member/btn_google_login.gif"
        alt="Login with Google"
      />
    </a>
  </li>
  <li class="displaynone">
    <a href="#none" onclick="">
      <img
        src="//img.echosting.cafe24.com/skin/base_en_US/member/btn_kakao_login.gif"
        alt="Login with Kakao Account"
      />
    </a>
  </li>
  <li class="displaynone">
    <a href="#none" onclick="">
      <img
        src="//img.echosting.cafe24.com/skin/base_en_US/member/btn_line_login.gif"
        alt="Login with LINE"
      />
    </a>
  </li>
  <li class="displaynone">
    <a href="#none" onclick="">
      <img
        src="//img.echosting.cafe24.com/skin/base_en_US/member/btn_apple_login.gif"
        alt="Login with Apple"
      />
    </a>
  </li>
</ul>;


<label>ID</label>
<dd>
  <input
    id="member_id"
    name="member_id"
    fw-filter="isFill"
    fw-label="ID"
    fw-msg=""
    class="inputTypeText"
    placeholder=""
    value=""
    type="text"
  />
</dd>

<dt>PASSWORD</dt>
<dd>
  <input
    id="member_passwd"
    name="member_passwd"
    fw-filter="isFill&amp;isMin[4]&amp;isMax[16]"
    fw-label="Password"
    fw-msg=""
    autocomplete="off"
    value=""
    type="password"
  />
</dd>
</dl>
</li>

<li class="security">
<input
id="member_check_save_id0"
name="check_save_id"
fw-filter=""
fw-label="Save ID"
fw-msg=""
value="T"
type="checkbox"
/><label for="member_check_save_id0">Save ID</label>
</li>