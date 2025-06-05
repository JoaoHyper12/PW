
  window.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
      apiKey: "AIzaSyBGh2mPk0gV-yuHuL4igjaxv_3pI-uIk3E",
      authDomain: "neuro-sphere.firebaseapp.com",
      projectId: "neuro-sphere",
      storageBucket: "neuro-sphere.appspot.com",
      messagingSenderId: "153829901586",
      appId: "1:153829901586:web:8d2b5330c0a5d732489fcb",
      measurementId: "G-B0QXZYM4BP"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        window.location.href = 'login.html';
        return;
      }

      document.getElementById('email').value = user.email || '';
      document.getElementById('nome').value = user.displayName || '';
    });

    document.getElementById('form-perfil').addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = auth.currentUser;
      if (!user) {
        alert('Nenhum usuário autenticado!');
        return;
      }

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const senhaAtual = document.getElementById('senha-atual').value;
      const novaSenha = document.getElementById('nova-senha').value;
      const confirmaNovaSenha = document.getElementById('confirma-nova-senha').value;

      if (novaSenha && novaSenha !== confirmaNovaSenha) {
        alert('Nova senha e confirmação não coincidem!');
        return;
      }

      try {
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, senhaAtual);
        await user.reauthenticateWithCredential(credential);

        let alterouAlgo = false;

        if (email !== user.email) {
          await user.updateEmail(email);
          alterouAlgo = true;
        }

        if (nome !== user.displayName) {
          await user.updateProfile({ displayName: nome });
          alterouAlgo = true;
        }

        if (novaSenha) {
          await user.updatePassword(novaSenha);
          alterouAlgo = true;
        }

        if (alterouAlgo) {
          await user.sendEmailVerification();
          alert('Alterações salvas! Verifique seu e-mail para confirmar as mudanças.');
        }

        document.getElementById('senha-atual').value = '';
        document.getElementById('nova-senha').value = '';
        document.getElementById('confirma-nova-senha').value = '';

      } catch (error) {
        alert('Erro: ' + error.message);
      }
    });

    document.getElementById('btn-sair').addEventListener('click', async () => {
      try {
        await auth.signOut();
        window.location.href = 'Página Inicial.html';
      } catch (error) {
        alert('Erro ao sair: ' + error.message);
      }
    });

    });
