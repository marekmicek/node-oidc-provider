module.exports = `<div class="login-client-image">
  <% if (client.logoUri) { %><img src="<%= client.logoUri %>"><% } %>
</div>

<ul>
<% if ([details.scopes.accepted, details.scopes.rejected, details.claims.accepted, details.claims.rejected].every(({ length }) => length === 0)) { %>
  <li>this is a new authorization</li>
<% } %>

<% if ([details.scopes.new, details.claims.new].every(({ length }) => length === 0)) { %>
  <li>the client is asking you to confirm previously given authorization</li>
<% } %>

<% newScopes = new Set(details.scopes.new); newScopes.delete('openid'); newScopes.delete('offline_access') %>
<% if (newScopes.size) { %>
  <li>scopes:</li>
  <ul>
    <% newScopes.forEach((scope) => { %>
      <li><%= scope %></li>
    <% }) %>
  </ul>
<% } %>

<% newClaims = new Set(details.claims.new); ['sub', 'sid', 'auth_time', 'acr', 'amr', 'iss'].forEach(Set.prototype.delete.bind(newClaims)) %>
<% if (newClaims.size) { %>
  <li>claims:</li>
  <ul>
    <% newClaims.forEach((claim) => { %>
      <li><%= claim %></li>
    <% }) %>
  </ul>
<% } %>

<% if (params.scope && params.scope.includes('offline_access')) { %>
  <li>
  the client is asking to have offline access to this authorization
    <% if (!details.scopes.new.includes('offline_access')) { %>
      (which you've previously granted)
    <% } %>
  </li>
<% } %>

</ul>

<form autocomplete="off" action="<%= interactionUrl %>" method="post">
  <input type="hidden" name="prompt" value="consent"/>
  <button autofocus type="submit" class="login login-submit">Continue</button>
</form>
`;
